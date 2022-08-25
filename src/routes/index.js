import Home from '~/pages/Home';
import JewelryAndAccessories from '~/pages/JewelryAndAccessories';
import ClothingAndShoes from '~/pages/ClothingAndShoes';
import HomeAndLiving from '~/pages/HomeAndLiving';
import WeddingAndParty from '~/pages/WeddingAndParty';
import ToysAndEntertainment from '~/pages/ToysAndEntertainment';
import ArtAndCollectibles from '~/pages/ArtAndCollectibles';
import CraftSuppliesAndTools from '~/pages/CraftSuppliesAndTools';

export const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/jewelry',
        component: JewelryAndAccessories,
    },
    {
        path: '/clothing',
        component: ClothingAndShoes,
    },
    {
        path: '/living',
        component: HomeAndLiving,
    },
    {
        path: '/wedding',
        component: WeddingAndParty,
    },
    {
        path: '/toys',
        component: ToysAndEntertainment,
    },
    {
        path: '/art',
        component: ArtAndCollectibles,
    },
    {
        path: '/craft',
        component: CraftSuppliesAndTools,
    },
];
