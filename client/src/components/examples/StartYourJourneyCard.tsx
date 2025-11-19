import StartYourJourneyCard from '../StartYourJourneyCard';

export default function StartYourJourneyCardExample() {
  return (
    <div className="p-8 bg-background">
      <StartYourJourneyCard
        onSelectPath={(path) => console.log('Selected path:', path)}
      />
    </div>
  );
}
