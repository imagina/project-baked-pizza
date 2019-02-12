import {helper} from '@imagina/qhelper/_plugins/helper';

export function INIT_CART (state, payload){
	state.items = payload
}

export function ADD_ITEM (state, payload) {
	let item = state.items.find(product => product.id === payload.id)
	if (item === undefined) 
	{
		state.items.push(payload)
	} else 
	{
		item.quantity_cart += payload.quantity_cart 
	}
	helper.storage.set('cart', state)
}

export function DELETE_ITEM (state, payload) {
	state.items.splice(payload, 1)
	helper.storage.set('cart', state)
}

export function UPDATE_ITEM_UP (state, payload) {
	let item = state.items.find(product => product.id === payload.id)
	item.quantity_cart++
	helper.storage.set('cart', state)
}

export function UPDATE_ITEM_DOWN (state, payload) {
	console.log('in mutations')
	let item = state.items.find(product => product.id === payload.id)
	if (item.quantity_cart > 1) 
	{
		item.quantity_cart--
	}
	helper.storage.set('cart', state)
}



