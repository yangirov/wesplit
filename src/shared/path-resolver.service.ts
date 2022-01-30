import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

const paths: string[] = ['events', 'login', 'feedback', 'settings'];

@Injectable({
  providedIn: 'root',
})
export class PathResolverService implements Resolve<string | null> {
  constructor(private router: Router) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    const typoPath = state.url.replace('/', '');
    const threshold = this.getThreshold(typoPath);
    const dictionary = Object.values(paths).filter(
      (path) => Math.abs(path.length - typoPath.length) < threshold
    );

    if (!dictionary.length) return null;

    this.sortByDistances(typoPath, dictionary);

    console.log(dictionary[0]);

    return await this.router.navigate(['/', `${dictionary[0]}`]);
  }

  getThreshold(path: string): number {
    if (path.length < 5) return 3;

    return 5;
  }

  sortByDistances(typoPath: string, dictionary: string[]) {
    const pathsDistance = {} as { [name: string]: number };

    dictionary.sort((a, b) => {
      if (!(a in pathsDistance)) {
        pathsDistance[a] = this.levenshtein(a, typoPath);
      }
      if (!(b in pathsDistance)) {
        pathsDistance[b] = this.levenshtein(b, typoPath);
      }

      return pathsDistance[a] - pathsDistance[b];
    });
  }

  levenshtein(a: string, b: string): number {
    if (a.length == 0) {
      return b.length;
    }
    if (b.length == 0) {
      return a.length;
    }

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }
}
