import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart-selector';
import { selectCurrentUser } from '../../store/user/user-selector';
import { PaymentFormContainer, FormConatainer } from './payment-form.style'

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const paymentHandler = async (e) => {
        e.preventDefault(e);

        if (!stripe || !elements) {
            return;
        }

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then(res => res.json());

        // console.log(response);

        const { paymentIntent: {client_secret} } = response
        // console.log(client_secret)

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : "Guest",
                }
            }
        })

        if(paymentResult.error){
            alert(paymentResult.error.message);
        }else{
            if(paymentResult.paymentIntent.status === "succeeded"){
                alert('Payment Successfull');
            }
        }
    };


    return (
        <PaymentFormContainer>
            <FormConatainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment:</h2>
                <CardElement />
                <button className='btn btn-primary'>Pay now</button>
            </FormConatainer>
        </PaymentFormContainer>
    );
}

export default PaymentForm;