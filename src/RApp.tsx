import "./App.css";
import SVGComponent from "./components/SVGComponent";
import { useState, useEffect } from "react";
import {
  DndContext,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { Column } from "./components/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { SmartPointerSensor } from "./components/SmartPointerSensor";
import { SmartTouchSensor } from "./components/SmartTouchSensor";
import SendButton from "./components/SendButton";

function RApp() {
  const firstSemiFinal = [
    { id: "CY", content: "Cyprus", music: "./music2/Cyprus1.mp3" },
    { id: "RS", content: "Serbia", music: "./music2/Serbia.mp3" },
    { id: "LT", content: "Lithuania", music: "./music2/Lithuania.mp3" },
    { id: "IE", content: "Ireland", music: "./music2/Ireland.mp3" },
    { id: "UA", content: "Ukraine", music: "./music2/Ukraine.mp3" },
    { id: "PL", content: "Poland", music: "./music2/Poland.mp3" },
    { id: "HR", content: "Croatia", music: "./music2/Croatia.mp3" },
    { id: "IS", content: "Iceland", music: "./music2/Iceland.mp3" },
    { id: "SI", content: "Slovenia", music: "./music2/Slovenia.mp3" },
    { id: "FI", content: "Finland", music: "./music2/Finland.mp3" },
    { id: "MD", content: "Moldova", music: "./music2/Moldova.mp3" },
    { id: "AZ", content: "Azerbaijan", music: "./music2/Azerbaijan.mp3" },
    { id: "AU", content: "Australia", music: "./music2/Australia.mp3" },
    { id: "PT", content: "Portugal", music: "./music2/Portugal.mp3" },
    { id: "LU", content: "Luxembourg", music: "./music2/Luxembourg.mp3" },
  ];

  const realfirstSemifinalists = [
    { id: "HR", content: "Croatia", music: "./music2/Croatia.mp3" },
    { id: "UA", content: "Ukraine", music: "./music2/Ukraine.mp3" },
    { id: "LT", content: "Lithuania", music: "./music2/Lithuania.mp3" },
    { id: "FI", content: "Finland", music: "./music2/Finland.mp3" },
    { id: "CY", content: "Cyprus", music: "./music2/Cyprus1.mp3" },
    { id: "LU", content: "Luxembourg", music: "./music2/Luxembourg.mp3" },
    { id: "IE", content: "Ireland", music: "./music2/Ireland.mp3" },
    { id: "PL", content: "Poland", music: "./music2/Poland.mp3" },
    { id: "RS", content: "Serbia", music: "./music2/Serbia.mp3" },
    { id: "AU", content: "Australia", music: "./music2/Australia.mp3" },
  ];

  const secondSemiFinal = [
    { id: "MT", content: "Malta", music: "./music2/Malta.mp3" },
    { id: "AL", content: "Albania", music: "./music2/Albania.mp3" },
    { id: "GR", content: "Greece", music: "./music2/Greece.mp3" },
    { id: "CH", content: "Switzerland ", music: "./music2/Switzerland.mp3" },
    {
      id: "CZ",
      content: "Czech Republic",
      music: "./music2/CzechRepublic.mp3",
    },
    { id: "AT", content: "Austria", music: "./music2/Austria.mp3" },
    { id: "DK", content: "Denmark", music: "./music2/Denmark.mp3" },
    { id: "AM", content: "Armenia", music: "./music2/Armenia.mp3" },
    { id: "LV", content: "Latvia", music: "./music2/Latvia.mp3" },
    { id: "SM", content: "San Marino", music: "./music2/SanMarino.mp3" },
    { id: "GE", content: "Georgia", music: "./music2/Georgia.mp3" },
    { id: "BE", content: "Belgium", music: "./music2/Belgium.mp3" },
    { id: "EE", content: "Estonia", music: "./music2/Estonia.mp3" },
    { id: "IL", content: "Israel", music: "./music2/Israel.mp3" },
    { id: "NO", content: "Norway", music: "./music2/Norway.mp3" },
    { id: "NL", content: "Netherlands", music: "./music2/Netherlands.mp3" },
  ];

  const realsecondSemifinalists = [
    { id: "NL", content: "Netherlands", music: "./music2/Netherlands.mp3" },
    { id: "CH", content: "Switzerland", music: "./music2/Switzerland.mp3" },
    { id: "GR", content: "Greece", music: "./music2/Greece.mp3" },
    { id: "AM", content: "Armenia", music: "./music2/Armenia.mp3" },
    { id: "NO", content: "Norway", music: "./music2/Norway.mp3" },
    { id: "IL", content: "Israel", music: "./music2/Israel.mp3" },
    { id: "BE", content: "Belgium", music: "./music2/Belgium.mp3" },
    { id: "AT", content: "Austria", music: "./music2/Austria.mp3" },
    { id: "EE", content: "Estonia", music: "./music2/Estonia.mp3" },
    { id: "GE", content: "Georgia", music: "./music2/Georgia.mp3" },
  ];

  const finalists = [
    { id: "SE", content: "Sweden", music: "./music2/Sweden.mp3" },
    { id: "FR", content: "France", music: "./music2/France.mp3" },
    { id: "IT", content: "Italy", music: "./music2/Italy.mp3" },
    {
      id: "GB",
      content: "United Kingdom",
      music: "./music2/UnitedKingdom.mp3",
    },
    { id: "DE", content: "Germany", music: "./music2/Germany.mp3" },
    { id: "ES", content: "Spain", music: "./music2/Spain.mp3" },
  ].concat(realfirstSemifinalists, realsecondSemifinalists);

  const realFinalists = finalists;

  const [items, setItems] = useState(() => {
    // Get the saved items from localStorage if available, otherwise set a default list
    const savedItems = localStorage.getItem("RealcountryItems");
    return savedItems ? JSON.parse(savedItems) : firstSemiFinal;
  });
  const [playingMusicId, setPlayingMusicId] = useState<string | null>(null);
  const [hasPlayedMusic, setHasPlayedMusic] = useState(
    localStorage.getItem("RealhasPlayedMusic") === "true" || false
  );
  const [showTooltip, setShowTooltip] = useState(false);

  const [initialAnimationsPlayed, setInitialAnimationsPlayed] = useState(
    () => localStorage.getItem("RealinitialAnimationsPlayed") !== "true"
  );
  const [submissionDone, setSubmissionDone] = useState(
    localStorage.getItem("Realsubmitted") === "true" || false
  );
  const [content, setContent] = useState(
    localStorage.getItem("Realsubmitted") === "true"
      ? "Locked in"
      : "Lock in top 10"
  );

  useEffect(() => {
    if (localStorage.getItem("RealinitialAnimationsPlayed") !== "true") {
      // If the animations haven't been played, set the flag and let the animations play
      localStorage.setItem("RealinitialAnimationsPlayed", "true");
      // timeout
      setTimeout(() => {
        setInitialAnimationsPlayed(false);
      }, 2000);
    } else {
      setInitialAnimationsPlayed(true); // this prevents the animation from playing on subsequent renders
    }
  }, []);

  useEffect(() => {
    // Save the items to localStorage whenever they change
    localStorage.setItem("RealcountryItems", JSON.stringify(items));
  }, [items]);

  // Function to compare the user's guessed finalists with the actual finalists
  const compareFinalResults = (actualFinalists: any) => {
    const userFinalGuesses = JSON.parse(
      localStorage.getItem("userFinal") || "[]"
    );
    if (!userFinalGuesses.length) {
      alert("You have not submitted your final guesses!");
      return;
    }

    const results = userFinalGuesses.map((guess: any) => {
      const actualIndex = actualFinalists.findIndex(
        (finalist: any) => finalist.id === guess.id
      );
      const guessIndex = userFinalGuesses.findIndex(
        (finalist: any) => finalist.id === guess.id
      );
      const positionDifference = guessIndex - actualIndex;

      return {
        ...guess,
        guess: positionDifference, // This directly shows how many positions off the guess was
      };
    });

    setItems(results);
  };

  useEffect(() => {
    const currentTime = new Date();

    const firstChange = new Date("2024-05-08T04:00:00Z");
    const semifinalChange = new Date("2024-05-09T19:00:00Z");
    const secondChange = new Date("2024-05-10T04:00:00Z");
    const finalChange = new Date("2024-05-11T19:00:00Z");
    const finalResultTime = new Date("2024-05-12T04:00:00Z"); // Assuming the finals end at this time

    if (currentTime > finalResultTime) {
      if (localStorage.getItem("finalResultsCompared") !== "true") {
        compareFinalResults(realFinalists); // Make sure `finalists` array is sorted by actual results
        localStorage.setItem("finalResultsCompared", "true");
      }
    } else if (currentTime > finalChange) {
      // If after finalChange, load the finalists and reset order
      if (localStorage.getItem("finalChangeHappened") !== "true") {
        setItems(finalists);
        resetItemsOrder();
        localStorage.setItem("finalChangeHappened", "true");
        setContent("Lock in the vote");
      }
    } else if (currentTime > secondChange) {
      // If after secondChange, compare results and lock them
      if (localStorage.getItem("secondChangeHappened") !== "true") {
        compareResults(realsecondSemifinalists);
        handleLock();
        localStorage.setItem("secondChangeHappened", "true");
      }
    } else if (currentTime > semifinalChange) {
      // If after semifinalChange, load the second semifinal and reset order
      if (localStorage.getItem("semifinalChangeHappened") !== "true") {
        setItems(secondSemiFinal);
        resetItemsOrder();
        localStorage.setItem("semifinalChangeHappened", "true");
      }
    } else if (currentTime > firstChange) {
      // If after firstChange, compare results and lock them
      if (localStorage.getItem("firstChangeHappened") !== "true") {
        compareResults(realfirstSemifinalists);
        handleLock();
        localStorage.setItem("firstChangeHappened", "true");
      }
    }
    // else {
    //   // If before firstChange, load the first semifinal and reset order
    //   setItems(firstSemiFinal);
    //   resetItemsOrder();
    //   localStorage.removeItem("firstChangeHappened");
    //   localStorage.removeItem("semifinalChangeHappened");
    //   localStorage.removeItem("secondChangeHappened");
    //   localStorage.removeItem("finalChangeHappened");
    //   localStorage.removeItem("userTopTen");
    //   localStorage.removeItem("userFinal");
    //   localStorage.removeItem("finalResultsCompared");
    // }
  }, []);

  const resetItemsOrder = () => {
    localStorage.removeItem("RealcountryItems"); // Clear the saved order from localStorage
    localStorage.removeItem("Realsubmitted"); // Clear the submission flag
    setSubmissionDone(false); // Reset the submission state
    setContent("Lock in top 10"); // Reset the button text
    localStorage.removeItem("userTopTen"); // Clear the music flag
  };

  const handleLock = () => {
    setSubmissionDone(true);
    localStorage.setItem("Realsubmitted", "true");
    setContent("Locked in");
  };

  const getCountryPos = (id: string) =>
    items.findIndex((item: any) => item.id === id);

  const handleDragEnd = (event: any) => {
    setInitialAnimationsPlayed(true);
    localStorage.setItem("RealinitialAnimationsPlayed", "true");
    const { active, over } = event;

    if (!over) return; // Add this line to prevent errors when dropping outside a valid area
    setItems((tasks: any) => {
      const originalPos = getCountryPos(active.id);
      const newPos = getCountryPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const handleFinalSubmission = () => {
    setSubmissionDone(true);
    localStorage.setItem("Realsubmitted", "true");
    setContent("Locked in");
    localStorage.setItem("userFinal", JSON.stringify(items));
  };

  const handleSubmission = () => {
    if (!hasPlayedMusic) {
      alert(
        "Find hidden music player before submitting your vote. There is no going back!"
      );
      setShowTooltip(true);
      return; // Exit the function to prevent further execution until music is played
    }
    if (content === "Locked in") return;
    if (content === "Lock in the vote") {
      handleFinalSubmission();
      return;
    }

    const elementsToAnimate = document.querySelectorAll(
      ".country:not(:nth-child(-n+10))"
    );
    setSubmissionDone(true);
    localStorage.setItem("Realsubmitted", "true");
    setContent("Locked in");
    if (elementsToAnimate.length === 0) {
      return;
    }
    localStorage.setItem("userTopTen", JSON.stringify(items.slice(0, 10)));
    let country = playingMusicId?.slice(6);
    console.log(country);
    // check if the country is in the top 10
    let isCountryInTop10 = false;
    for (let i = 0; i < 10; i++) {
      if (items[i].id === country) {
        isCountryInTop10 = true;
        break;
      }
    }
    if (!isCountryInTop10) {
      playMusic("");
    }

    // Assuming each country has equal height or you calculate this dynamically
    const totalHeight = Array.from(elementsToAnimate).reduce(
      (acc, el) => acc + (el as HTMLElement).offsetHeight,
      0
    );

    // Apply the animation class to these elements
    elementsToAnimate.forEach((el) => el.classList.add("fallAndFade"));

    // Move the SendButton up by adjusting its style
    // This example assumes you've wrapped your SendButton in a div with a class for easy targeting
    const sendButton = document.querySelector(".s-button") as HTMLElement;
    if (sendButton) {
      sendButton.style.transform = `translateY(${totalHeight}px)`;
    }

    // Wait for the animation to complete before updating the state
    setTimeout(() => {
      setItems(items.slice(0, 10)); // Only keep the first 10 items
      // Optionally reset the SendButton's position after the state update if needed
      if (sendButton) {
        sendButton.style.transform = ``;
      }
    }, 1000); // This duration should match the duration of the CSS animation
  };

  const compareResults = (realSemifinalists: any) => {
    const userTopTen = JSON.parse(localStorage.getItem("userTopTen") || "[]");
    if (!userTopTen.length) {
      alert("You have not submitted your top 10!");
      setItems(realFinalists);
      return;
    }
    const matches = userTopTen.map((entry: any) => ({
      ...entry,
      isCorrect: realSemifinalists.some(
        (finalist: any) => finalist.id === entry.id
      ),
    }));
    setItems(matches);
  };

  const playMusic = (id: string) => {
    setHasPlayedMusic(true);
    localStorage.setItem("RealhasPlayedMusic", "true");
    if (playingMusicId !== id) {
      if (playingMusicId) {
        const audioElement = document.getElementById(
          playingMusicId
        ) as HTMLAudioElement;
        if (audioElement) {
          audioElement.pause();
          audioElement.currentTime = 0;
        }
      }
      setPlayingMusicId(id);
    }
  };

  const sensors = useSensors(
    useSensor(SmartPointerSensor),
    useSensor(SmartTouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  return (
    <div className="App">
      <SVGComponent></SVGComponent>
      {submissionDone ? (
        // If the submission is done, render the column without the DndContext
        <Column
          items={items}
          playMusic={playMusic}
          playingMusicId={playingMusicId}
          showTooltip={showTooltip}
          setShowTooltip={setShowTooltip}
          initialAnimationsPlayed={initialAnimationsPlayed}
        />
      ) : (
        // Otherwise, render it with the DndContext to allow dragging
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <Column
            items={items}
            playMusic={playMusic}
            playingMusicId={playingMusicId}
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
            initialAnimationsPlayed={initialAnimationsPlayed}
          />
        </DndContext>
      )}
      <SendButton
        handleSubmission={handleSubmission}
        content={content}
      ></SendButton>
    </div>
  );
}

export default RApp;
