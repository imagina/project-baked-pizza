import addresService from 'src/services/addresses'
import {helper} from '@imagina/qhelper/_plugins/helper'

export function initialState(context, payload) {
	context.commit('initialState')
}

export async function getAddresses (context, payload) {

	const user 	= await helper.storage.get.item('userData')
	
	if (user != null) {
		context.commit('userData',user)
		
		let data = {
			filter: { "user":  user.id},
			take: context.state.take,
			page: context.state.page,
		}

		const addresses = await addresService.index(data.filter, data.take, data.page)
		context.commit('Addresses', addresses)

		addresses.data.forEach(element => {
			if (element.default === '1') {
				context.commit('defaultAddress',element)
			}
		});
	}
}

export async function setAddress (context, payload) {

	const addresses = await addresService.create(payload)

	if (addresses.data.susses.code === '201') {
		return true
	}else{
		return false
	}
}

export async function deleteAddress(context, payload) {
	const address = await addresService.delete(payload)
}

export async function updateAddress(context, payload) {
	const address = await addresService.update({ attributes: payload.attributes }, payload.id)
	context.dispatch('getAddresses')
}

export function page(context, payload) {
	context.commit('page', payload)
}

export function setBillingAddress(context, payload) {
	context.commit('billingAddress', payload)
}

export function setBillingShippingaddress(context, payload) {
	context.commit('billingShippingaddress', payload)
}
