import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SignUp from '../views/SignUpView.vue'
import Login from '../views/LoginView.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Profile from '../views/ProfileView.vue'
import Voucher from '../views/VoucherView.vue'
import ChangePassword from '../views/ChangePassword.vue'
import AdminPage from '../views/AdminPage.vue'
import AdminProfile from '../views/AdminProfile.vue'
import ManageUser from '../views/ManageUser.vue'
import ManageVoucher from '../views/ManageVoucher.vue'
import PasswordSecurity from '../views/PasswordSecurity.vue'
import RedemptionHistory from '../views/RedemptionHistory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: ForgotPassword,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/voucher',
      name: 'voucher',
      component: Voucher,
    },
    {
      path: '/password-security',
      name: 'password-security',
      component: ChangePassword,
    },
    {
      path: '/admin/profile',
      name: 'admin-profile',
      component: AdminProfile,
    },
    {
      path: '/admin/manage-user',
      name: 'manage-user',
      component: ManageUser,
    },
    {
      path: '/admin/manage-voucher',
      name: 'manage-voucher',
      component: ManageVoucher,
    },
    {
      path: '/admin/password-security',
      name: 'password-security',
      component: PasswordSecurity,
    },
    {
      path: '/admin/redemption-history',
      name: 'redemption-history',
      component: RedemptionHistory,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage,
    },
  ],
})

export default router
