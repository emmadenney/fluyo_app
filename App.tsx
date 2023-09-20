import { Pressable, Text, View, SafeAreaView } from "react-native";
import { collection, query, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "./firebaseConfig";
import { useEffect, useState } from "react";
import { styles } from "./styles";

export default function App() {
  const [exercises, setExercises] = useState<ExerciseInterface[]>([]);
  const [currExerciseIndex, setCurrExerciseIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("_____");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [checkAnswer, setCheckAnswer] = useState<boolean>(false);
  const [resultTheme, setResultTheme] = useState<any>({});
  const [optionsDisabled, setOptionsDisabled] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(false);

  interface ExerciseInterface {
    id: string;
    instruction: string;
    english: string;
    german: string;
    missingWordGerman: string;
    missingWordEnglish: string;
    answerOptions: string[];
  }

  // listens for changes in the exercises collection
  useEffect(() => {
    const q = query(collection(firestoreDB, "exercises"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const exercisesData: any[] = [];
      querySnapshot.forEach((doc) => {
        exercisesData.push(doc.data());
      });
      setExercises(exercisesData);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const currExercise = exercises[currExerciseIndex];

  const handleNextExercise = () => {
    setCurrExerciseIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex >= exercises.length) {
        return 0;
      }
      return newIndex;
    });
    setSelectedAnswer("_____");
    setCheckAnswer(false);
    setOptionsDisabled(false);
    setResultTheme({});
  };

  const handleAnswerSelection = (answerOption: string) => {
    setSelectedAnswer(answerOption);
    // change color of selected pressable
  };

  const handleShowHideTranslation = () => {
    setShowTranslation(true);
  };

  const handleCheckAnswer = () => {
    setCheckAnswer(true);
    setOptionsDisabled(true);
    if (selectedAnswer === currExercise.missingWordGerman) {
      setResultTheme({
        text: "Great Job!",
        backgroundColor: "#2BBCC3",
        color: "#E6F1F4",
      });
      setCorrect(true);
    } else {
      setResultTheme({
        text: `Answer: ${currExercise.missingWordGerman}`,
        backgroundColor: "#f6735f",
        color: "#E6F1F4",
      });
      setCorrect(false);
    }
  };

  // may need some kind of grid system to display the german sentence with translation for each word on top

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.content}>
          <View>
            <Text style={[styles.contentText, styles.instruction]}>
              {currExercise.instruction}
            </Text>
            <Text style={[styles.contentText, { fontSize: 25 }]}>
              {currExercise.english.split(" ").map((word) => {
                if (word === currExercise.missingWordEnglish) {
                  return (
                    <Text key={word} style={styles.englishWord}>
                      {" "}
                      {word}{" "}
                    </Text>
                  );
                } else {
                  return (
                    <Pressable key={word} onPress={handleShowHideTranslation}>
                      <Text> {word} </Text>
                    </Pressable>
                  );
                }
              })}
            </Text>
            <Text style={[styles.contentText, { fontSize: 20, marginTop: 60 }]}>
              {currExercise.german.split(" ").map((word) => {
                if (word === currExercise.missingWordGerman) {
                  return (
                    <Text
                      style={[
                        selectedAnswer !== "_____" ? styles.option : null,
                        {
                          backgroundColor: resultTheme.backgroundColor,
                          color: resultTheme.color,
                        },
                      ]}
                      key={word}
                    >
                      {selectedAnswer}{" "}
                    </Text>
                  );
                } else {
                  return (
                    <Pressable key={word} onPress={handleShowHideTranslation}>
                      <Text>{word} </Text>
                    </Pressable>
                  );
                }
              })}
            </Text>
          </View>
          <View style={styles.optionsContainer}>
            {currExercise.answerOptions.map((answerOption) => {
              return (
                <Pressable
                  style={styles.option}
                  key={answerOption}
                  disabled={optionsDisabled}
                  onPress={() => {
                    handleAnswerSelection(answerOption);
                  }}
                >
                  <Text>{answerOption}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        {checkAnswer ? (
          <View
            style={[
              styles.subContainer,
              { backgroundColor: resultTheme.backgroundColor },
            ]}
          >
            {correct ? (
              <Text style={styles.resultText}>Great Job!</Text>
            ) : (
              <Text style={styles.resultText}>
                <Text>Answer: </Text>
                <Text style={{ fontWeight: "normal" }}>
                  {currExercise.missingWordGerman}
                </Text>
              </Text>
            )}
            <Pressable
              style={[styles.button, { backgroundColor: resultTheme.color }]}
              onPress={handleNextExercise}
            >
              <Text
                style={{
                  color: resultTheme.backgroundColor,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                CONTINUE
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={[styles.subContainer]}>
            <Pressable
              style={[styles.button, { backgroundColor: "#2BBCC3" }]}
              onPress={handleCheckAnswer}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                CHECK ANSWER
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
