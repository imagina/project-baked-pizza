export function INIT_ORDER (state, payload){

}

export function UPDATE_ORDER (state, payload) {
	state.order.payload


	let item = state.items.find(product => product.id === payload.id)
	item.quantity_cart++
	helper.storage.set('cart', state)
}