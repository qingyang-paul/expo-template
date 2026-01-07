// ✅ 必须放最上面！在任何逻辑开始之前，先把环境补丁打上
import 'react-native-url-polyfill/auto';
import '../global.css';

import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack />;
}
