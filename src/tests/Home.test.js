import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import Home from '../pages/Home.jsx'; // sesuaikan dengan path file Home.jsx

// Mock data untuk loader
const mockLoaderData = {
    message : "Success",
    total : 4,
    data: [
        {
            "id": "5ce9ef59-d056-4cdc-b0e5-c8a8d9f9bb92",
            "title": "Count Vowels",
            "code": "CW-0001",
            "level": 2,
            "description": "Deskripsi Masalah: Menghitung Jumlah Huruf Vokal dalam Sebuah String\n\nAnda diminta untuk mengimplementasikan fungsi count_vowels yang akan menerima sebuah string sebagai input dan menghitung jumlah huruf vokal (a, e, i, o, u) yang terdapat dalam string tersebut. Fungsi ini harus mengembalikan total jumlah huruf vokal yang ditemukan.\n\nContoh:\n\nInput: \"Hello, World!\"\nJumlah huruf vokal: 3 (e, o, o)\nInput: \"Python is amazing\"\nJumlah huruf vokal: 5 (o, i, a, i, a)",
            "testCases": [
                "\"hello\",2",
                "\"How are you\",5",
                "\"BAnana\",3"
            ],
            "workTime": {
                "hours": "1"
            },
            "startDate": "2024-02-21T19:56:00.000Z",
            "endDate": "2024-05-15T20:01:00.000Z",
            "baseImport": "import sys\nimport time\n\n",
            "baseFunction": "def count_vowels(input_string):\n    return ''",
            "baseMain": "print(count_vowels('${test[0]}') == ${test[1]})\n",
            "createdAt": "2024-02-21T20:00:37.000Z",
            "updatedAt": "2024-05-07T19:45:17.000Z"
        },
        {
            "id": "5db0c225-83ad-409d-b5d3-1f8408958482",
            "title": "Add Two Number",
            "code": "AD-002",
            "level": 1,
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aenean et tortor at risus viverra. Maecenas volutpat blandit aliquam etiam erat velit scelerisque. Nec ullamcorper sit amet risus nullam eget felis. Quam lacus suspendisse faucibus interdum posuere lorem ipsum. In vitae turpis massa sed elementum. Nunc non blandit massa enim nec dui. Adipiscing commodo elit at imperdiet dui accumsan. Tortor aliquam nulla facilisi cras fermentum odio eu. Lectus vestibulum mattis ullamcorper velit sed ullamcorper. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Faucibus purus in massa tempor nec feugiat. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Tincidunt ornare massa eget egestas purus viverra accumsan. Cursus sit amet dictum sit. Integer enim neque volutpat ac tincidunt. Turpis in eu mi bibendum. Quam id leo in vitae turpis. In hac habitasse platea dictumst vestibulum rhoncus.\n\nIn hac habitasse platea dictumst quisque. Pretium aenean pharetra magna ac placerat. Gravida quis blandit turpis cursus in hac. Ac placerat vestibulum lectus mauris ultrices. Congue nisi vitae suscipit tellus mauris a diam maecenas. Iaculis nunc sed augue lacus viverra vitae. Aliquam malesuada bibendum arcu vitae. Integer enim neque volutpat ac tincidunt. Leo integer malesuada nunc vel risus commodo viverra maecenas. Dolor purus non enim praesent elementum facilisis leo vel fringilla. Massa massa ultricies mi quis hendrerit.",
            "testCases": [
                "\"1,2\",\"3\"",
                "\"4,4\",\"8\"",
                "\"34,56\",\"90\""
            ],
            "workTime": {
                "hours": 1
            },
            "startDate": "2024-02-14T20:52:00.000Z",
            "endDate": "2024-05-15T20:52:00.000Z",
            "baseImport": "import sys\nimport time\n\n",
            "baseFunction": "def add(a,b):\n\treturn ''",
            "baseMain": "print(add(${test[0]},${test[1]}) == ${test[2]})",
            "createdAt": "2024-01-29T10:08:33.000Z",
            "updatedAt": "2024-05-11T09:33:00.000Z"
        },
        {
            "id": "b1fc3f7c-22e2-4746-b533-2756770e4eec",
            "title": "Calc Average",
            "code": "CA-0001",
            "level": 3,
            "description": "Deskripsi Masalah: Menghitung Rata-rata dari Sebuah List Angka\nAnda diminta untuk mengimplementasikan fungsi calculate_average yang akan menerima sebuah list angka sebagai input dan menghitung rata-rata dari seluruh angka dalam list tersebut. Fungsi ini harus mengembalikan nilai rata-rata.\nContoh:\n\nInput: [10, 20, 30, 40, 50]\n\nRata-rata: 10+20+30+40+50​=30\n\nInput: [5, 7, 9, 11]\n\nRata-rata: 5+7+9+11​=8",
            "testCases": [
                "\"[1,2,3,4,5]\",\"3.0\"",
                "\"[10,20,30,40,50]\",\"30.0\"",
                "\"[2,4,6,8,10]\",\"6.0\""
            ],
            "workTime": {
                "hours": "2"
            },
            "startDate": "2024-02-21T20:02:00.000Z",
            "endDate": "2024-05-15T20:07:00.000Z",
            "baseImport": "import sys\nimport time\n\n",
            "baseFunction": "def calculate_average(numbers):\n  return ''",
            "baseMain": "print(calculate_average([${test[0]}]) == ${test[1]})",
            "createdAt": "2024-02-21T20:06:07.000Z",
            "updatedAt": "2024-05-14T00:30:32.000Z"
        },
        {
            "id": "c4f40e63-2bc3-471d-b3bb-3560ae84d14a",
            "title": "Palindrome",
            "code": "PR-0003",
            "level": 1,
            "description": "### This program should be tell if the number or the words been input is palindrome or not\n\n`Example :  121 = True; 123 = False`\n\n| Cell 1| Cell 2|\n|--------|--------|\n| Anjay| Anjayy|\n| Cell | Cell |\n| Cell | Cell |\n\n```js\nconsole.log(\"Hello World\")\n```\n\n> Widiiiihhhh\n\n<!-- Commment -->\n\n- asdasdas\n- adasdas\n\n\n1. asdasd\n2. aiojdiowsaas\n\n- [ ] Keren gak\n- [ ] Keren Lah Masa enggak\n\n---\n# Anjayyy",
            "testCases": [
                "\"121\",\"True\"",
                "\"34543\",\"True\"",
                "\"4321\",\"False\"",
                "\"KATAK\",\"True\""
            ],
            "workTime": {
                "hours": "2"
            },
            "startDate": "2024-02-20T16:46:00.000Z",
            "endDate": "2024-02-29T21:39:00.000Z",
            "baseImport": "import sys\nimport time\n\n",
            "baseFunction": "def isPalindrome(input):\n    return ''",
            "baseMain": "print(isPalindrome(${test[0]})==${test[1]})",
            "createdAt": "2024-02-20T16:52:37.000Z",
            "updatedAt": "2024-02-22T21:44:17.000Z"
        }
    ]
}

// Mock useLoaderData hook
vi.mock('react-router-dom', () => ({
  ...vi.requireActual('react-router-dom'),
  useLoaderData: () => mockLoaderData,
}));

test('renders Home page with problems table', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  // Cek apakah judul halaman telah diatur
  expect(document.title).toBe('Home');

  // Cek apakah tabel dan header tabel dirender dengan benar
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByText('Code')).toBeInTheDocument();
  expect(screen.getByText('Title')).toBeInTheDocument();
  expect(screen.getByText('Due Date')).toBeInTheDocument();
  expect(screen.getByText('Level')).toBeInTheDocument();
  expect(screen.getByText('Actions')).toBeInTheDocument();

  // Cek apakah data dari mockLoaderData dirender dengan benar
  expect(screen.getByText('P001')).toBeInTheDocument();
  expect(screen.getByText('Sample Problem 1')).toBeInTheDocument();
  expect(screen.getByText('08:00 01-05-2024 - 10:00 01-05-2024')).toBeInTheDocument();
  expect(screen.getByText('Solve')).toBeInTheDocument();

  expect(screen.getByText('P002')).toBeInTheDocument();
  expect(screen.getByText('Sample Problem 2')).toBeInTheDocument();
  expect(screen.getByText('08:00 01-06-2024 - 10:00 01-06-2024')).toBeInTheDocument();
  expect(screen.getByText('Solve')).toBeInTheDocument();
});
