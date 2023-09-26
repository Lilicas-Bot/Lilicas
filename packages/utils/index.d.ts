declare module '@lilicas/utils' {
  export function getArrayRandom<T> (array: T[]): T

  export function isTruthy (value: string | boolean): boolean

  export function loadDirectory (path: string, modules?: Array<any>): Array<any>

  export class RequestClient {
    constructor()
    public get<T> (url: string, params: any): Promise<T>
    public post<T> (url: string, params: any): Promise<T>
    public patch<T> (url: string, params: any): Promise<T>
    public put<T> (url: string, params: any): Promise<T>
    public delete<T> (url: string, params: any): Promise<T>
    private prepareRequest<T> (method: string, url: string, params: any): Promise<T>
  }
}
