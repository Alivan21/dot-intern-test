import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

interface ResultsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  totalCorrect: number;
  totalWrong: number;
  totalAnswered: number;
  score: number;
  onClearCookiesAndNavigate: () => void;
}

export default function ResultsDialog({
  isOpen,
  onClose,
  totalCorrect,
  totalWrong,
  totalAnswered,
  score,
  onClearCookiesAndNavigate,
}: ResultsDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogTrigger asChild>
        <button type="button" className="hidden">
          Open Results
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Quiz Results</AlertDialogTitle>
          <AlertDialogDescription>Here are your quiz results:</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2">
          <p>Total Correct: {totalCorrect}</p>
          <p>Total Wrong: {totalWrong}</p>
          <p>Total Answered: {totalAnswered}</p>
          <p>Score: {score}</p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClearCookiesAndNavigate}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
