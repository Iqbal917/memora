import './App.css'
import {Button} from "./components/ui/button.tsx";
import {PlusIcon} from "./icons/PlusIcon.tsx";

function App() {

  return (
    <>
        <Button
            variant="primary"
            size="md"
            startIcon= {<PlusIcon size={"md"}/>}
            text="Add Content"
            onClick={() => {}}
        />

        <Button
            variant="secondary"
            size="md"
            text="Share Brain"
            startIcon="↗"
            onClick={() => {}}
        />
    </>
  )
}

export default App
