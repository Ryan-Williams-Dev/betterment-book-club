import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface UseKeyboardShortcutsProps {
  setCurrentPage: (page: string) => void;
}

const useKeyboardShortcuts = ({
  setCurrentPage,
}: UseKeyboardShortcutsProps): void => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      // Shift + Cmd (Mac) or Shift + Ctrl (Windows) + D
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key === "d"
      ) {
        event.preventDefault(); // Prevent default browser behavior
        router.push("/dashboard"); // Navigate to the dashboard
        setCurrentPage("/dashboard"); // Update the current page state
      }

      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key === "s"
      ) {
        event.preventDefault();
        router.push("/search");
        setCurrentPage("/search");
      }

      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key === "l"
      ) {
        event.preventDefault();
        router.push("/library");
        setCurrentPage("/library");
      }

      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key === "c"
      ) {
        event.preventDefault();
        router.push("/community");
        setCurrentPage("/community");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router, setCurrentPage]);
};

export default useKeyboardShortcuts;
