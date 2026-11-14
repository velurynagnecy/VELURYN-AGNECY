import { CreditCardForm, type CardState, type CardValidity } from './credit-card-form';

export default function DemoOne() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <CreditCardForm
        defaultHolder="Rahil Vahora"
        maskMiddle
        onChange={(_state: CardState, _validity: CardValidity) => {
          // live form output
        }}
        onSubmit={(state, validity) => {
          alert(JSON.stringify({ state, validity }, null, 2));
        }}
      />
    </main>
  );
}
