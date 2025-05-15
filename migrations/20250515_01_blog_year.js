import {DataTypes} from "sequelize";
import yearValidator from "../util/yearValidator.js";

export default {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('blogs', 'year', {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                yearValidator,
            },
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('blogs', 'year');
    },
}