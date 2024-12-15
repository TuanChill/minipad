import { defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.MAILGUN_DOMAIN': JSON.stringify(env.MAILGUN_DOMAIN),
      'process.env.MAILGUN_SECRET': JSON.stringify(env.MAILGUN_SECRET),
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        external: ['mailgun.js', 'form-data']
      }
    },
  }
})