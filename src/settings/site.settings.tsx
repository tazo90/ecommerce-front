const menu = [
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
            path: "/menu?cat=wrappers",
            label: "Wrappers",
            columnItemItems: [
              {
                id: 1,
                path: "/search?q=hot-harrisa",
                label: "Hot Harrisa",
                image:
                  "https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Web/kubelki/nowe/kubelki_4os-kubelki_30_strips.png",
              },
              {
                id: 2,
                path: "/search?q=smoky",
                label: "Smoky BBQ",
                image:
                  "https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Web/kubelki/nowe/kubelki_4os-classic.png",
              },
              {
                id: 3,
                path: "/search?q=kentucky",
                label: "Kentucky Gold",
                image:
                  "https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Web/kubelki/nowe/kubelki_4os-classic.png",
              },
            ],
          },
          {
            id: 2,
            path: "/menu?cat=shakes",
            label: "Shakes",
            columnItemItems: [
              {
                id: 1,
                path: "/search?q=hot-harrisa",
                label: "Hot Harrisa",
                image:
                  "https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Web/kubelki/nowe/kubelki_4os-kubelki_30_strips.png",
              },
              {
                id: 2,
                path: "/search?q=smoky",
                label: "Smoky BBQ",
                image:
                  "https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Web/kubelki/nowe/kubelki_4os-classic.png",
              },
              {
                id: 3,
                path: "/search?q=kentucky",
                label: "Kentucky Gold",
                image:
                  "https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Web/kubelki/nowe/kubelki_4os-classic.png",
              },
            ],
          },
          {
            id: 3,
            path: "/search?cat=z-ryzem",
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
];

const mobileMenu = [
  {
    id: 1,
    path: "/",
    label: "menu-demos",
    subMenu: [
      {
        id: 1,
        path: "/",
        label: "menu-modern",
      },
      {
        id: 2,
        path: "/standard",
        label: "menu-standard",
      },
      {
        id: 3,
        path: "/minimal",
        label: "menu-minimal",
      },
      {
        id: 4,
        path: "/vintage",
        label: "menu-vintage",
      },
      {
        id: 5,
        path: "/classic",
        label: "menu-classic",
      },
    ],
  },
  {
    id: 2,
    path: "/search?q=men-wear",
    label: "menu-men-wear",
    subMenu: [
      {
        id: 1,
        path: "/search?q=top-wear",
        label: "menu-top-wear",
        subMenu: [
          {
            id: 1,
            path: "/search?q=t-shit-shirtrt",
            label: "menu-t-shirt",
          },
          {
            id: 2,
            path: "/search?q=casual-shirts",
            label: "menu-casual-shirts",
          },
          {
            id: 3,
            path: "/search?q=formal-shirts",
            label: "menu-formal-shirts",
          },
          {
            id: 4,
            path: "/search?q=blazwers-coats",
            label: "menu-blazwers-coats",
          },
          {
            id: 5,
            path: "/search?q=suits",
            label: "menu-suits",
          },
          {
            id: 6,
            path: "/search?q=jackets",
            label: "menu-jackets",
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
      {
        id: 4,
        path: "/search?q=western-wear",
        label: "menu-western-wear",
        subMenu: [
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
        id: 5,
        path: "/search?q=plus-size",
        label: "menu-plus-size",
      },
      {
        id: 6,
        path: "/search?q=sunglasses-frames",
        label: "menu-sunglasses-frames",
      },
      {
        id: 7,
        path: "/search?q=footwear",
        label: "menu-footwear",
        subMenu: [
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
        id: 8,
        path: "/search?q=sports-active-wear",
        label: "menu-sports-active-wear",
        subMenu: [
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
  {
    id: 3,
    path: "/search?q=women-wear",
    label: "menu-women-wear",
    subMenu: [
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
];

export const siteSettings = {
  name: "ECommerce Front",
  description: "Test",
  defaultLanguage: "en",
  logo: {
    url: "/assets/images/kfc_logo.jpg",
    alt: "KFC",
    href: "/",
    width: 46,
    height: 46,
  },
  siteHeader: {
    menu,
    mobileMenu,
  },
};
