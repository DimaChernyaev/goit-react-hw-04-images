import { useState, useEffect } from "react";
import fetchImages from "helpers/api";
import SearchForm from "../Form/Form";
import ImageList from "components/ImageList/ImageList";
import LoadMore from "components/LoadMore/LoadMore";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import Loader from "components/Loader/Loader";
import { Gallery } from "./App.styled";
import ConstMessage from "helpers/ConstMessage";



const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [isError, setError] = useState(null);

  useEffect(() => {
    if(!value) {
      return
    }

    const abortCtrl = new AbortController();

    async function getImages() {  
      setIsLoading(true)

      try {
        const searchValue = value.slice(value.indexOf('/') + 1);
        const {totalHits, hits} = await fetchImages(searchValue, page, abortCtrl);
  
        if (!hits.length) {
          setIsButtonShow(false);
          setError(ConstMessage.errorFetch)
          return;
        }
  
        setImages(prevState => [...prevState, ...hits])
        setIsButtonShow(true);
        setError(null)

        if (page * 40 > totalHits && totalHits) {
          setIsButtonShow(false);
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(ConstMessage.errorFetch)
        }
      } finally {
        setIsLoading(false)
      }
    }

    getImages();
    
    return() => {
      abortCtrl.abort();
    }

  }, [value, page])


  function hendeleSubmit({value}, {resetForm}) {

    if (!value.trim()) {
      setImages([])
      setIsButtonShow(false);
      setError(ConstMessage.emptyLine)

      resetForm()
      return;
    }

    setImages([]);
    setIsButtonShow(false);
    setError(null);
    setValue(`${Date.now()}/${value}`);
    setPage(1);
    setIsLoading(false);

    resetForm();
  }

  function handlePage() {
    setPage(prevState => prevState + 1);
  }

  return (
      <Gallery>
        <SearchForm
          onSubmit={hendeleSubmit}
        />

        {images && <ImageList images={images}/>}
        {isError && <ErrorMessage>{isError}</ErrorMessage>}
        {isLoading && <Loader/>}
        {isButtonShow && !isLoading && <LoadMore onClick={handlePage}/>}

      </Gallery>
    )
};

export default App;
