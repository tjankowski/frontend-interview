import { request } from "./api";
import fetchMock from "jest-fetch-mock";

const mockResponseBody = { convertedAmount: 10 };

const spy = jest.spyOn(global, "fetch");
// fetch = jest.fn((input: RequestInfo, init?: RequestInit | undefined) =>
//   Promise.resolve({
//     json: () => mockResponseBody,
//     ok: () => true,
//   })
// );

describe("request", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should return body for successful response", async () => {
    fetchMock.mockResponseOnce(() =>
      Promise.resolve(JSON.stringify(mockResponseBody))
    );
    const result = await request("/test");
    expect(result).toEqual(mockResponseBody);
  });

  it("should return error for unsuccessful response", async () => {
    fetchMock.mockResponseOnce(() =>
      Promise.resolve({
        status: 404,
        body: "Not Found",
      })
    );
    await expect(request("/test")).rejects.toThrow();
  });
});
