import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.port || 9000
    const app = await NestFactory.create(AppModule)
    app.enableCors({ origin: '*' })

    await app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()