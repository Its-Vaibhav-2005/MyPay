import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import PageLoader from "../../components/PageLoader"
import {BalanceCard} from '../../components/BalanceCard'

import { Image } from 'react-native'  

import {useTransactions} from "../../hooks/useTransaction"
import { useEffect } from 'react'
import { styles } from '../../assets/styles/home.style'
import IonIcons from '@expo/vector-icons/Ionicons'

export default function Page() {
  const { user } = useUser()
  const router = useRouter()

  const {transactions, summary, isLoading, loadData, deleteTransaction} = useTransactions(user.id)

  useEffect(
    () => {
      loadData()
    }, [loadData]
  )

  if(isLoading){
    return <PageLoader />
  }
  console.log("User ID:", user.id); 
  console.log("Transactions:", transactions);
  console.log("Summary:", summary);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/*Header */}
        <View style={styles.header}>
          {/*Left*/}
          <View style={styles.headerLeft}>
            <Image 
              source={require('../../assets/images/logo.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>{user?.emailAddresses[0]?.emailAddress.split("@")[0]}</Text>
            </View>
          </View>
          {/*Right*/}
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={()=>router.push('/create')}>
              <IonIcons name="add" size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        {/* Summary */}
        <BalanceCard summary={summary} />

      </View>      
    </View>
  )
}