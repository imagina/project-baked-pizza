export function init_order (context, payload) {
	context.commit('INIT_ORDER', payload)
}

export function update_order (context, payload,) {
	context.commit('UPDATE_ORDER', payload)
}
