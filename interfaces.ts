export interface DataBase_I {
    username: String,
    database: String,
    password: String
}

export interface Model_I {
    name: String,
    model: Function
}

export interface Props_I {
    models: Array<Model_I>,
    Sequelize: Function,
    dataBases: Array<DataBase_I>
}