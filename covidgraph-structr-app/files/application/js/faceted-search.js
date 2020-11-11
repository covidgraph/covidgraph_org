import { FacetedSearch } from '/application/js/FacetedSearch.js';

function callback() {

	console.log('Testing...');

}

document.addEventListener('DOMContentLoaded', function(event) {

	const searchInput = document.getElementById('facetted-search-input');
	
	const facetedSearch = new FacetedSearch(searchInput, '/endpoints/faceted-search', callback, {
		Equipment    : 'equipment',
		Computer     : 'computer',
		Network      : 'network',
		File         : 'file',
		MACAddress   : 'mac-address',
		IPAddress    : 'ip-address',
		Location     : 'location',
		AssetTag     : 'asset-tag',
		AddressRange : 'address-range',
		Gateway      : 'gateway'		
	});

});


	