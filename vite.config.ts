import { defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.SERVICEID_MAILJS': JSON.stringify(env.SERVICEID_MAILJS),
      'process.env.TEMPLATEID_MAILJS': JSON.stringify(env.TEMPLATEID_MAILJS),
      'process.env.PUBLICID_MAILJS': JSON.stringify(env.PUBLICID_MAILJS),
    },
    plugins: [react()],
  }
})