# StreamFlow Backend 🌐🎥  

**StreamFlow Backend** — это серверная часть стриминговой платформы, обеспечивающая обработку данных, управление пользователями и взаимодействие с базой данных для поддержки высоконагруженных прямых трансляций.

## 🔧 Основные возможности:
- **Аутентификация и авторизация**: Безопасная система входа с поддержкой OAuth.  
- **Обработка трансляций**: Управление потоками данных для стримов в реальном времени.  
- **API для фронтенда**: REST/GraphQL для работы с интерфейсом.  
- **Управление пользователями**: Регистрация, профили, подписки и донаты.  
- **Интеграция с базой данных**: PostgreSQL для безопасного хранения информации.  

## 🛠️ Технологический стек:
- **Node.js**: Высокопроизводительный сервер на базе JavaScript.  
- **Express.js**: Лёгкий фреймворк для создания API.  
- **PostgreSQL**: Реляционная база данных для хранения данных о пользователях, стримах и подписках.  
- **Docker**: Удобная контейнеризация для упрощения разработки и деплоя.  

## 🚀 Быстрый старт:
1. Установите зависимости:
   ```bash
   pnpm install
2. Настройте переменные окружения (используйте .env.example как шаблон).
3. Запустите сервер в режиме разработки:
   ```bash
   pnpm dev
4. Для запуска через Docker:
   ```bash
   docker-compose up

## 📂 Структура проекта:
/src                    # Исходный код приложения
  /config                # Настройки приложения
  /core                 # Основная логика приложения
  /shared               # Общие компоненты и утилиты

## 💡 Планируемые улучшения:

- Поддержка WebSocket для чатов в реальном времени.
- Масштабируемость потоков с использованием CDN.
- Логирование и мониторинг.