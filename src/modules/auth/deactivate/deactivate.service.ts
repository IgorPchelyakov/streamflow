import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'argon2'
import type { Request } from 'express'

import { TokenType, type User } from '@/prisma/generated'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { generateToken } from '@/src/shared/utils/generated-token.util'
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util'
import { destroySession } from '@/src/shared/utils/session.utils'

import { MailService } from '../../libs/mail/mail.service'

import { DeactivateAccountInput } from './input/deactivate-account.input'

@Injectable()
export class DeactivateService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
		private readonly mailService: MailService
	) {}

	public async deactivate(
		req: Request,
		input: DeactivateAccountInput,
		user: User,
		userAgent: string
	) {
		const { email, password, pin } = input

		if (user.email !== email) {
			throw new BadRequestException('Неверная почта')
		}

		const isValidPassword = await verify(user.password, password)

		if (!isValidPassword) {
			throw new BadRequestException('Неверный пароль')
		}

		if (!pin) {
			await this.sendDeactivateToken(req, user, userAgent)

			return { message: 'Confirmation code required' }
		}

		await this.validateDeactivateToken(req, pin)

		return { user }
	}

	private async validateDeactivateToken(req: Request, token: string) {
		const existingToken = await this.prismaService.token.findUnique({
			where: {
				token,
				type: TokenType.DEACTIVATE_ACCOUNT
			}
		})

		if (!existingToken) {
			throw new NotFoundException('Token is not found')
		}

		const hasExpired = new Date(existingToken.expiresIn) < new Date()

		if (hasExpired) {
			throw new BadRequestException('Token expired')
		}

		await this.prismaService.user.update({
			where: {
				id: existingToken.userId
			},
			data: {
				isDeactivated: true,
				deactivatedAt: new Date()
			}
		})

		await this.prismaService.token.delete({
			where: {
				id: existingToken.id,
				type: TokenType.DEACTIVATE_ACCOUNT
			}
		})

		return destroySession(req, this.configService)
	}

	public async sendDeactivateToken(
		req: Request,
		user: User,
		userAgent: string
	) {
		const deactivateToken = await generateToken(
			this.prismaService,
			user,
			TokenType.DEACTIVATE_ACCOUNT,
			false
		)

		const metadata = getSessionMetadata(req, userAgent)

		await this.mailService.sendDeactivateToken(
			user.email,
			deactivateToken.token,
			metadata
		)

		return true
	}
}
