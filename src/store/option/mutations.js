import {helper} from '@imagina/qhelper/_plugins/helper';


export function ADD_OPTION (state, payload) {
	const newTask = {
		'product_option_id': payload.id,
    'product_option_value_id': payload.value.id
  }
  state.options.unshift(newTask)
}

export function DELETE_OPTION (state, payload) {
  let index = state.options.findIndex(option => option.id === payload)
  state.options.splice(index, 1)
}