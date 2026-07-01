// API Configuration

export const Config = (
  import.meta.env.MODE == "development" ? {
    BaseUrl: "http://localhost:1337/api",
  } : import.meta.env.MODE == "test" ? {
    BaseUrl: "https://testapi.shipmehk.com/api",
  } : import.meta.env.MODE == "production" ? {
    BaseUrl: "https://api.shipmehk.com/api",
  } : undefined
)