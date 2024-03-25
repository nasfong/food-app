import { ArrowRightAlt } from '@mui/icons-material';

type Props = {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPage: number
}

export const Pagination = ({ currentPage, setCurrentPage, totalPage }: Props) => {
  return (
    <div>
      {currentPage !== 1 && (
        <button
          className={`button3 me-3`}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          <ArrowRightAlt fontSize='small' sx={{ transform: 'rotate(180deg)' }} />
        </button>
      )}
      {Array.from({ length: totalPage }, (_, index) => index + 1).map(item => (
        <button
          key={item}
          className={`button3 me-3 ${item == currentPage ? 'active' : ''}`}
          onClick={() => setCurrentPage(item)}
        >
          {item}
        </button>
      ))}
      {currentPage !== totalPage && (
        <button
          className={`button3 me-3`}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          <ArrowRightAlt fontSize='small' />
        </button>
      )}
    </div>
  )
} 
