import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Alert, Text, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { styles } from '../assets/styles/home.style'
import { COLORS } from '../constants/colors'
export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Hey, are you leaving us alone?", [
      {
        text: "Yes",
        style: "destructive",
        onPress: signOut
      },
      {
        text: "No",
        style: "cancel",
      }
    ])
  }
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
      <Ionicons name="log-out-outline" size={20} color={COLORS.text} />
    </TouchableOpacity>
  )
}