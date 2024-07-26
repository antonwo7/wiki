import { Dialect } from 'sequelize/types';

export const config = {
    database: {
        dialect: 'mysql' as Dialect,
        host: 'localhost',
        port: 3306,
        username: 'mysql',
        password: 'mysql',
        database: '_test_nest',
        logging: false,
        define: {
            updatedAt: false
        }
    }
}