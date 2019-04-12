

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

export const page = (state, opened) => {
	state.page = opened
}
