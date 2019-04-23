export const Shops = (state, opened) => {
    state.shops  = opened.data
}

export const Domicile = (state, opened) => {
    state.domicile  = opened
}

export const storeSelected = (state, opened) => {
    state.storeSelected  = opened
}