# react-spider-solitaire

## Introduction 

Windows 번들 게임인 '스파이더 카드게임'을 React와 Redux를 사용하여 구현한 웹 어플리케이션입니다.

(https://react-spider-solitaire.firebaseapp.com/)

## Rules
카드를 가장 적게 움직여 테이블의 카드를 모두 제거하는 것이 게임의 목표입니다. 각 열의 카드를 내림차순, 즉 킹에서 에이스의 순서로 정렬하면 해당 열은 테이블에서 제거됩니다. 

옮길 수 있는 카드가 없는 경우 테이블 위쪽의 카드 묶음을 클릭하면 각 열에 새 카드가 한 장씩 더 추가됩니다.

한 번에 두 장 이상의 카드도 옮길 수 있습니다. 동시에 옮기고자 하는 일련의 카드가 모두 같은 짝패이고 순서대로 늘어져 있으면 해당 카드들을 한 장의 카드인 것처럼 옮길 수 있습니다.

## Scoring
게임은 500점에서 시작하며 게임이 끝날 때까지 카드를 옮긴 횟수(실행 취소 포함)만큼을 이 점수에서 뺍니다. 또한 테이블에서 열을 제거할 때마다 100점씩을 더합니다.

## Difficulty
초급, 중급, 고급이 있습니. 초급은 한 개의 짝패(1슈트), 중급은 두 개의 짝패(2슈트), 고급은 네 개의 짝패(4슈트)로 덱이 구성되어 있다.

## License
MIT