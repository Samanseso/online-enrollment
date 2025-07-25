import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import StudentList from '../pages/user_management/students';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavCategory {
    category: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Student {
    name: string;
    id: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    birth_date: string;
    gender: string;
    email: string;
    contact_number: string;
    address: string;
    barangay: string;
    city: string;
    program_id: string;
    year_level: string;
    status: string;
}

export interface TabItem {
    title: string;
    href: string;
}