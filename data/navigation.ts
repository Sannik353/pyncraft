import type {Category} from '@/data/furniture';

export type MenuDestination = {label:string; category:Category; subcategory?:string};
export type MenuGroup = {title:string; category:Category; image:string; alt:string; subcategories?:MenuDestination[]};
export type MegaMenu = {id:string; label:string; groups:MenuGroup[]};
const photo=(id:string)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=160&h=160&q=80`;
const link=(label:string,category:Category):MenuDestination=>({label,category,subcategory:label});
const group=(title:string,category:Category,imageId:string,alt:string,subcategories?:MenuDestination[]):MenuGroup=>({title,category,image:photo(imageId),alt,subcategories});

export const megaMenus:MegaMenu[]=[
{id:'living-room',label:'Living Room',groups:[
 group('Sofas','Sofas','photo-1555041469-a586c61ea9bc','Neutral upholstered sofa in a warm living room',[link('2 Seater Sofas','Sofas'),link('3 Seater Sofas','Sofas'),link('L-Shaped Sofas','Sofas'),link('Sofa Sets','Sofas')]),
 group('Coffee Tables','Cabinets','photo-1600210492486-724fe5c67fb0','Wood coffee table in a calm living space'),
 group('TV Units','Cabinets','photo-1494438639946-1ebd1d20bf85','Low timber cabinet in an interior'),
 group('Recliners','Sofas','photo-1567538096630-e0c55bd6374c','Comfortable lounge chair'),
 group('Cabinets','Cabinets','photo-1494438639946-1ebd1d20bf85','Timber cabinet in a contemporary home'),
 group('Bookshelves','Cabinets','photo-1594620302200-9a762244a156','Bookshelf with natural wood finish')
]},
{id:'bedroom',label:'Bedroom',groups:[
 group('Beds','Beds','photo-1505693416388-ac5ce068fe85','Crafted timber bed in a sunlit bedroom',['King Size Beds','Queen Size Beds','Single Beds','Storage Beds','Custom Beds'].map(n=>link(n,'Beds'))),
 group('Wardrobes','Wardrobes','photo-1616486029423-aaa4789e8c9a','Natural wood wardrobe in a bright bedroom',['2 Door Wardrobes','3 Door Wardrobes','4 Door Wardrobes','Sliding Wardrobes','Custom Wardrobes'].map(n=>link(n,'Wardrobes'))),
 group('Dressing Tables','Custom Furniture','photo-1618221195710-dd6b41faaea6','Dressing table in a softly lit bedroom'),
 group('Nightstands','Custom Furniture','photo-1505693416388-ac5ce068fe85','Wood bedside table in a warm bedroom'),
 group('Chest of Drawers','Cabinets','photo-1616486338812-3dadae4b4ace','Wood storage drawers'),
 group('Ottomans','Custom Furniture','photo-1567538096630-e0c55bd6374c','Upholstered ottoman beside a chair')
]},
{id:'dining',label:'Dining',groups:[
 group('Dining Tables','Dining Tables','photo-1600210492486-724fe5c67fb0','Handcrafted timber dining table'),
 group('Dining Chairs','Dining Tables','photo-1505693416388-ac5ce068fe85','Dining chairs around a wood table'),
 group('Dining Sets','Dining Tables','photo-1617806118233-18e1de247200','A complete dining set'),
 group('Crockery Units','Cabinets','photo-1494438639946-1ebd1d20bf85','Timber crockery cabinet'),
 group('Sideboards','Cabinets','photo-1494438639946-1ebd1d20bf85','Walnut sideboard in a warm interior')
]},
{id:'study-office',label:'Study & Office',groups:[
 group('Study Tables','Custom Furniture','photo-1497366754035-f200968a6e72','Wood desk in a calm home office'),
 group('Office Desks','Custom Furniture','photo-1497366754035-f200968a6e72','Natural timber office desk'),
 group('Office Chairs','Custom Furniture','photo-1505693416388-ac5ce068fe85','Comfortable chair at a study desk'),
 group('Bookshelves','Cabinets','photo-1594620302200-9a762244a156','Built-in wood bookshelves'),
 group('Storage Cabinets','Cabinets','photo-1494438639946-1ebd1d20bf85','Wood storage cabinetry')
]},
{id:'custom-furniture',label:'Custom Furniture',groups:[
 group('Custom Beds','Beds','photo-1505693416388-ac5ce068fe85','Made-to-order bed in a thoughtful bedroom'),
 group('Custom Wardrobes','Wardrobes','photo-1616486029423-aaa4789e8c9a','Made-to-order natural timber wardrobe'),
 group('Custom TV Units','Cabinets','photo-1494438639946-1ebd1d20bf85','Custom low timber media unit'),
 group('Custom Cabinets','Cabinets','photo-1494438639946-1ebd1d20bf85','Bespoke timber cabinetry'),
 group('Custom Furniture Projects','Custom Furniture','photo-1620626011761-996317b8d101','Hand-finished timber furniture detail')
]}
];

export function destinationHref(destination:MenuDestination){const params=new URLSearchParams({category:destination.category});if(destination.subcategory)params.set('subcategory',destination.subcategory);return `/collection?${params.toString()}`}


export function groupDestination(group:MenuGroup):MenuDestination{return{label:group.title,category:group.category,subcategory:group.title===group.category?undefined:group.title}}


