import Header from '../Header';

export default function HeaderExample() {
  return <Header onBookAppointment={() => console.log('Book appointment clicked')} />;
}
