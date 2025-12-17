import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicatorBase,
  ActivityIndicator,
  ScrollView,
} from "react-native"
import CustomAlert from '../../components/CustomAlert'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { useState } from 'react'
import { API_URL } from "../../constants/api";
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS } from "../../constants/colors"

import { styles } from '../../assets/styles/create.styles'


const CATEGORIES = [
    {id: "food", name: "Food & Drinks", icon: "fast-food" },
    {id: "shopping", name: "Shopping", icon: "cart" },
    {id: "transportation", name: "Transportation", icon: "car" },
    {id: "entertainment", name: "Entertainment", icon: "film" },
    {id: "bills", name: "Bills", icon: "receipt" },
    {id: "friends_family", name: "Friends & Family", icon: "people" },
    {id: "income", name: "Income", icon: "cash" },
    {id: "grocery", name: "Grocery", icon: "basket" },
    {id: "health", name: "Health", icon: "heart" },
    {id: "travel", name: "Travel", icon: "airplane" },
    {id: "education", name: "Education", icon: "book" },
    {id: "gift", name: "Gift", icon: "gift" },
    {id: "other", name: "Other", icon: "ellipsis-horizontal" },
]

const create = () => {
    const router = useRouter()
    const {user} = useUser()

    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [isExpense, setIsExpense] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [alertConfig, setAlertConfig] = useState({
        visible: false,
        title: "",
        message: "",
        confirmText: "OK",
        cancelText: "Cancel",
        onConfirm: () => {},
        onCancel: undefined,
    });
    const hideAlert = () => setAlertConfig(prev => ({ ...prev, visible: false }));

    const handleCreate = async() =>{
        if(!title){
            return setAlertConfig({ visible: true, title: "Validation Error", message: "Hey, Title is missing!", onConfirm: hideAlert })
        }
        if(!amount || isNaN(parseFloat(amount))|| parseFloat(amount) <=0){
            return setAlertConfig({ visible: true, title: "Validation Error", message: "Hey, is this is a valid amount?", onConfirm: hideAlert })
        }
        if(!selectedCategory){
            return setAlertConfig({ visible: true, title: "Validation Error", message: "Please select a category", onConfirm: hideAlert })
        }

        setIsLoading(true)
        try{
            const formattedAmount = isExpense ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount))
            const response = await fetch(
                `${API_URL}/transactions`, 
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        title,
                        amount: formattedAmount,
                        category: selectedCategory,
                        userId: user.id
                    })
                }
            )
            if(!response.ok){
                throw new Error("Network response was not ok")
            }
            setAlertConfig({ 
                visible: true, 
                title: "Success", 
                message: "Transaction created successfully!", 
                onConfirm: () => {
                    hideAlert();
                    router.navigate({ pathname: '/', params: { refresh: Date.now().toString() } });
                }
            })
        }catch(error){
            console.log("Failed to create transaction:", error);
            setAlertConfig({ visible: true, title: "Error", message: "Failed to create transaction. Please try again.", onConfirm: hideAlert })
        }finally{
            setIsLoading(false)
        }
    }

    return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Transaction</Text>
        <TouchableOpacity
          style={[styles.saveButtonContainer, isLoading && styles.saveButtonDisabled]}
          onPress={handleCreate}
          disabled={isLoading}
        >
          <Text style={styles.saveButton}>{isLoading ? "Saving..." : "Save"}</Text>
          {!isLoading && <Ionicons name="checkmark" size={18} color={COLORS.primary} />}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.typeSelector}>
            {/* EXPENSE SELECTOR */}
            <TouchableOpacity
              style={[styles.typeButton, isExpense && styles.typeButtonActive]}
              onPress={() => setIsExpense(true)}
            >
              <Ionicons
                name="arrow-down-circle"
                size={22}
                color={isExpense ? COLORS.white : COLORS.expense}
                style={styles.typeIcon}
              />
              <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>
                Expense
              </Text>
            </TouchableOpacity>

            {/* INCOME SELECTOR */}
            <TouchableOpacity
              style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
              onPress={() => setIsExpense(false)}
            >
              <Ionicons
                name="arrow-up-circle"
                size={22}
                color={!isExpense ? COLORS.white : COLORS.income}
                style={styles.typeIcon}
              />
              <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>
                Income
              </Text>
            </TouchableOpacity>
          </View>

          {/* AMOUNT CONTAINER */}
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor={COLORS.textLight}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>

          {/* INPUT CONTAINER */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="create-outline"
              size={22}
              color={COLORS.textLight}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Transaction Title"
              placeholderTextColor={COLORS.textLight}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* TITLE */}
          <Text style={styles.sectionTitle}>
            <Ionicons name="pricetag-outline" size={16} color={COLORS.text} /> Category
          </Text>

          <View style={styles.categoryGrid}>
            {/* Column 1 */}
            <View style={styles.masonryColumn}>
              {CATEGORIES.filter((_, i) => i % 2 === 0).map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.name && styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(category.name)}
                >
                  <Ionicons
                    name={category.icon}
                    size={20}
                    color={selectedCategory === category.name ? COLORS.white : COLORS.text}
                    style={styles.categoryIcon}
                  />
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category.name && styles.categoryButtonTextActive,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Column 2 */}
            <View style={styles.masonryColumn}>
              {CATEGORIES.filter((_, i) => i % 2 !== 0).map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.name && styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(category.name)}
                >
                  <Ionicons
                    name={category.icon}
                    size={20}
                    color={selectedCategory === category.name ? COLORS.white : COLORS.text}
                    style={styles.categoryIcon}
                  />
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category.name && styles.categoryButtonTextActive,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        confirmText={alertConfig.confirmText}
        cancelText={alertConfig.cancelText}
        onConfirm={alertConfig.onConfirm}
        onCancel={alertConfig.onCancel}
      />
    </View>
  );
}

export default create