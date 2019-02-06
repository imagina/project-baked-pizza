export function init_cart (context, payload) {
	context.commit('INIT_CART', payload)
}

export function add_item (context, payload) {
	context.commit('ADD_ITEM', payload)
}

export function delete_item (context, payload) {
	context.commit('DELETE_ITEM', payload)
}

export function update_item_up (context, payload,) {
	context.commit('UPDATE_ITEM_UP', payload)
}

export function update_item_down (context, payload,) {
	context.commit('UPDATE_ITEM_DOWN', payload)
}
