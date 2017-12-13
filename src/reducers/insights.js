import _ from 'lodash'

export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        if (_.isObject(constant)) {
            acc[constant.name] = constant.value;
        } else {
            acc[constant] = constant;
        }
        return acc;
    }, {});
}
export const CONSTANTS = createConstants(
    'ADD'
);

const DEFAULT_STATE = {
    items: [],
};

export default function insights(state = DEFAULT_STATE, action) {
    switch (action) {
      case CONSTANTS.ADD:
        return (model, payload) =>
            Object.assign({}, model, { items: _.concat(model.items, payload) })
      default:
        return state
    }
  }