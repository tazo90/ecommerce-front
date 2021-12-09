export const siteSettings = {
  name: 'ECommerce Front',
  description: 'Test',
  defaultLanguage: 'en',
  logo: {
		url: "/assets/images/logo.svg",
		alt: "KFC",
		href: "/",
		width: 95,
		height: 30,
	},
  siteHeader: {
		menu: [
			{
				id: 1,
				path: "/",
				label: "Pages",
				subMenu: [
					{
						id: 1,
						path: "/kfc",
						label: "KFC",
					},
					{
						id: 2,
						path: "/ph",
						label: "Pizza Hut",
					},
					{
						id: 3,
						path: "/bk",
						label: "Burger King",
					},
				],
			},
			{
				id: 2,
				path: "/menu",
				label: "Menu",
				columns: [
					{
						id: 1,
						columnItems: [
							{
								id: 1,
								path: "/menu?cat=kubelki",
								label: "Kubełki",
								columnItemItems: [
									{
										id: 1,
										path: "/search?q=strips",
										label: "Strips",
										image: 'https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Web/kubelki/nowe/kubelki_4os-kubelki_30_strips.png'
									},
									{
										id: 2,
										path: "/search?q=bestsellery",
										label: "Bestsellery",
										image: 'https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Web/kubelki/nowe/kubelki_4os-classic.png'
									},
									{
										id: 3,
										path: "/search?q=classic",
										label: "Classic",
										image: 'https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Web/kubelki/nowe/kubelki_4os-classic.png'
									},
								],
							},
							{
								id: 2,
								path: "/search?q=belt-scarves",
								label: "menu-belt-scarves",
							},
							{
								id: 3,
								path: "/search?q=watches-wearables",
								label: "menu-watches-wearables",
							},
						],
					},
					{
						id: 2,
						columnItems: [
							{
								id: 1,
								path: "/search?q=western-wear",
								label: "menu-western-wear",
								columnItemItems: [
									{
										id: 1,
										path: "/search?q=dresses",
										label: "menu-dresses",
									},
									{
										id: 2,
										path: "/search?q=jumpsuits",
										label: "menu-jumpsuits",
									},
									{
										id: 3,
										path: "/search?q=tops-t-shirt",
										label: "menu-tops-shirts",
									},
									{
										id: 4,
										path: "/search?q=shorts-skirts",
										label: "menu-shorts-skirts",
									},
									{
										id: 5,
										path: "/search?q=shurgs",
										label: "menu-shurgs",
									},
									{
										id: 6,
										path: "/search?q=blazers",
										label: "menu-blazers",
									},
								],
							},
							{
								id: 2,
								path: "/search?q=plus-size",
								label: "menu-plus-size",
							},
							{
								id: 3,
								path: "/search?q=sunglasses-frames",
								label: "menu-sunglasses-frames",
							},
						],
					},
					{
						id: 3,
						columnItems: [
							{
								id: 1,
								path: "/search?q=footwear",
								label: "menu-footwear",
								columnItemItems: [
									{
										id: 1,
										path: "/search?q=flats",
										label: "menu-flats",
									},
									{
										id: 2,
										path: "/search?q=casual-shoes",
										label: "menu-casual-shoes",
									},
									{
										id: 3,
										path: "/search?q=heels",
										label: "menu-heels",
									},
									{
										id: 4,
										path: "/search?q=boots",
										label: "menu-boots",
									},
								],
							},
							{
								id: 2,
								path: "/search?q=sports-active-wear",
								label: "menu-sports-active-wear",
								columnItemItems: [
									{
										id: 1,
										path: "/search?q=clothing",
										label: "menu-clothing",
									},
									{
										id: 2,
										path: "/search?q=footwear",
										label: "menu-footwear",
									},
									{
										id: 3,
										path: "/search?q=sports-accessories",
										label: "menu-sports-accessories",
									},
								],
							},
						],
					},
        ],
      },
    ],
  },         
};
