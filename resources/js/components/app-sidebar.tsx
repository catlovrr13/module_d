import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, PictureInPicture2 } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Configuration Panel',
        url: '/config',
        icon: LayoutGrid,
    },
    {
        title: 'Theme A',
        url: '/theme-a',
        icon: PictureInPicture2,
    },
    {
        title: 'Theme B',
        url: '/theme-b',
        icon: PictureInPicture2,
    },
    {
        title: 'Theme C',
        url: '/theme-c',
        icon: PictureInPicture2,
    },
    {
        title: 'Theme D',
        url: '/theme-d',
        icon: PictureInPicture2,
    },
    {
        title: 'Theme E',
        url: '/theme-e',
        icon: PictureInPicture2,
    },
    {
        title: 'Theme F',
        url: '/theme-f',
        icon: PictureInPicture2,
    },
    {
        title: 'Theme G',
        url: '/theme-g',
        icon: PictureInPicture2,
    },
    {
        title: 'Theme H',
        url: '/theme-h',
        icon: PictureInPicture2,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
