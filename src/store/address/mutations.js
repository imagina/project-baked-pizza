export const initialState = (state, opened) => {
	state.billingShippingaddress = true 
	state.billingAddress 		 = ''
	state.pagination 			 = []
	state.page 					 = 1
	state.take 					 = 6
	state.modale 				 = false
	state.addressSelected 		 = ''
}

export const Addresses = (state, opened) => {
    state.addresses     = opened.data
	state.pagination    = opened.meta.page
}

export const userData = (state, opened) => {
	state.user = opened
}

export const defaultAddress = (state, opened) => {
	state.defaultAddress = opened
}

export const addressSelected = (state, opened) => {
	state.addressSelected = opened
}

export const billingAddress = (state, opened) => {
	state.billingAddress = opened
}

export const billingShippingaddress = (state, opened) => {
	state.billingShippingaddress = opened
}

export const page = (state, opened) => {
	state.page = opened
}
