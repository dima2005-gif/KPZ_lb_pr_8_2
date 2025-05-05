interface Props {
  headerMessage: string;
  bodyMessage: string;
  show?: boolean;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Modal({ headerMessage, bodyMessage, show, onConfirm, onCancel }: Props): JSX.Element {
  return (
    <div className={`${!show ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out`}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full transform transition-transform duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{headerMessage}</h2>
        <p className="text-gray-700 mb-6">{bodyMessage}</p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={onCancel}
          >
            Скасувати
          </button>

          <button
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={onConfirm}
          >
            Підтвердити
          </button>
        </div>
      </div>
    </div>
  )
}
