
export function add_option (context, payload) {
	context.commit('ADD_OPTION', payload)
}

export function delete_option (context, payload) {
	context.commit('DELETE_OPTION', payload)
}
