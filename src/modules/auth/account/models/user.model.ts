import { Field, ID, ObjectType } from '@nestjs/graphql'

import type { User } from '@/prisma/generated'

@ObjectType()
export class UserModel implements User {
	@Field(() => ID)
	public id: string

	@Field(() => String)
	public email: string

	@Field(() => String)
	public password: string

	@Field(() => String)
	public username: string

	@Field(() => String)
	public displayName: string

	@Field(() => String, { nullable: true })
	public avatar: string

	@Field(() => String, { nullable: true })
	public bio: string

	@Field(() => Date)
	public createdAt: Date

	@Field(() => Date)
	public updatedAt: Date

	@Field(() => Boolean)
	public isEmailVerified: boolean

	@Field(() => Boolean)
	public isVerified: boolean

	@Field(() => Boolean)
	isTotpEnabled: boolean

	@Field(() => String, { nullable: true })
	totpSecret: string

	@Field(() => Boolean)
	public isDeactivated: boolean

	@Field(() => Date, { nullable: true })
	public deactivatedAt: Date
}
