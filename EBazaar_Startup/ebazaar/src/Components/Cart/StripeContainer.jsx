import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const PUBLIC_KEY = "pk_test_51MWe4lSFaKLT3Sf8WxhkoUav5vonmFUEVnidDGl9D7jkCKWF9ByAcvP7ehb7cbNBP2DcTdjb3RTfRozMb0CoqxBA00Mq2R5bhU"
const stripeTestPromise=loadStripe(PUBLIC_KEY)
const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
        <PaymentForm/>
    </Elements>
  )
}

export default StripeContainer