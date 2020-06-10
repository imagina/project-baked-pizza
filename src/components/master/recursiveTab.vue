<template>
	<q-tabs id="tabsMenu" class="q-pa-none q-py-sm" inverted>
		<!--Single Item-->
		<q-route-tab
				:to="getObjectTo(item)"
				v-if="checkItemSingle(item)"
				exact
				v-for="(item,key) in menu" :key="key" :icon="item.icon" :label="item.title" slot="title" />
		<q-tab v-else-if="checkItemMultiple(item)" slot="title">
			<q-btn-dropdown :icon="item.icon" :label="item.title" split inverted dense class="no-border no-shadow">
				<recursive-tab :key="key" :menu="item.children"/>
			</q-btn-dropdown>
		</q-tab>

		<!-- Dropdwon Item -->

		<!--<q-collapsible v-else-if="checkItemMultiple(item)"
					   :icon="item.icon" :label="item.title">
			<recursive-menu :key="key" :menu="item.children"/>
		</q-collapsible>-->
	</q-tabs>
</template>
<script>
	//Plugins
	import auth from '@imagina/quser/_plugins/auth'

	export default {
		name: 'recursiveTab',
		components: {},
		props: {
			menu: {default: false}
		},
		created() {
			this.$nextTick(function () {
				this.checkCollapsibles()
			})
		},
		methods: {
			checkItemSingle(item) {
				let response = true
				if (!item.activated) response = false
				if (item.children) response = false
				if (!item.name) response = false
				if (item.permission && !auth.hasAccess(item.permission)) response = false
				return response//Response
			},
			checkItemMultiple(item) {
				let response = true
				if (!item.children) response = false
				if (item.children && !item.children.length) response = false
				if (item.permission && !auth.hasAccess(item.permission)) response = false
				return response//Response
			},
			checkCollapsibles() {
				let collapsibles = this.$el.getElementsByClassName('q-collapsible')
				if(collapsibles.length){
					for(var group of collapsibles){
						let items = group.getElementsByClassName('q-link')
						if(!items.length)
							group.style.display = 'none'
					}
				}
			},
			getObjectTo(item){
				let response = {name : 'app.home'}
				if(item){
					if(item.name) response.name = item.name
					if(item.query) response.query = item.query
					if(item.params) response.params = item.params
				}
				return response
			}
		}
	}
</script>
<style lang="stylus">
	@import "~variables";
	#tabsMenu
		.q-tabs-left-scroll, .q-tabs-right-scroll
			color: $primary
			font-weight bold
			.q-icon
				font-size 45px
		.q-tab-label,.q-btn-inner
			font-family 'Bebas Neue',sans-serif!important
			font-size 24px
		.q-icon
			font-size 16px
		.q-collapsible-inner
			a, .q-collapsible
				border-top none !important

		.q-item, q-collapsible
			min-height 38px !important
			padding 6px 10px
		.q-tab-label-parent,.q-btn-dropdown
			display inline-flex
</style>