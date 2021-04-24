import { Props_I } from "./interfaces"

export class SequelizeMultiDB {
    private Sequelize
    private dataBases
    private models
    constructor(Props: Props_I) {
        this.Sequelize = Props.Sequelize
        this.dataBases = Props.dataBases
        this.models = Props.models
    }

    private assingModels(sequelizeInstance) {
        return this.models.reduce((list, model) => {
            return { ...list, [model.name]: model.model(sequelizeInstance) }
        }, {})
    }

    private async addConnection(bases, base, Sequelize) {
        try {
            let sequelizeInstance = new Sequelize({ ...base })
            await sequelizeInstance.authenticate()
            let newBases = { ...bases }
            newBases[base.database] = { ...sequelizeInstance, models: this.assingModels(sequelizeInstance) }
            return newBases
        } catch (err) {
            throw err
        }
    }

    private iterateDbs() {
        return this.dataBases.reduce((promise, base) => {
            return promise.then(async (bases) => {
                return await this.addConnection(bases, base, this.Sequelize)
            })
        }, Promise.resolve({}))
    }

    public async instace() {
        return await this.iterateDbs()
    }
}