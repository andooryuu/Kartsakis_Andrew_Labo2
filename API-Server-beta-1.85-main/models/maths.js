import Model from './model.js';

export default class Maths extends Model {
    constructor() {
        super();

        this.addField('op', 'string');
        this.addField('x', 'integer');
        this.addField('y', 'integer');
    }
}