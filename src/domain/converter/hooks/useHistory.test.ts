import { renderHook, act } from "@testing-library/react-hooks";
import { CurrencyCodes } from "../../../types";
import { generateMockHistoryItem } from "../../../utils/testUtils";
import { useHistory } from "./useHistory";

const mockItem = generateMockHistoryItem();

const mockGet = jest.fn();
const mockSave = jest.fn();

jest.mock("../../../infrastructure/storage", () => {
  return {
    ...jest.requireActual("../../../infrastructure/storage"),
    getItem: (key: string) => mockGet(key),
    saveItem: (key: string, item: string) => mockSave(key, item),
  };
});

describe("useHistory", () => {
  beforeEach(() => {
    mockGet.mockClear();
    mockSave.mockClear();
  });
  it("should get history if exists", async () => {
    mockGet.mockImplementationOnce(() => JSON.stringify([mockItem]));
    const { result } = renderHook(() => useHistory());

    expect(mockGet).toBeCalledTimes(1);
    expect(mockGet).toBeCalledWith("history");
    expect(result.current.history.length).toBe(1);
    expect(result.current.history[0]).toEqual(mockItem);
  });

  it("should get history if doesn't exist", async () => {
    mockGet.mockImplementationOnce(() => null);
    const { result } = renderHook(() => useHistory());

    expect(mockGet).toBeCalledTimes(1);
    expect(mockGet).toBeCalledWith("history");
    expect(result.current.history.length).toBe(0);
  });

  it("should add new item to history", async () => {
    mockGet.mockImplementationOnce(() => null);
    const { result } = renderHook(() => useHistory());

    expect(result.current.history.length).toBe(0);
    act(() => {
      result.current.addToHistory(
        mockItem.amount,
        mockItem.from as CurrencyCodes,
        mockItem.to as CurrencyCodes,
        mockItem.result
      );
    });
    expect(result.current.history.length).toBe(1);

    expect(mockSave).toBeCalledTimes(1);
    expect(mockSave).toBeCalledWith(
      "history",
      JSON.stringify(result.current.history)
    );
  });
});
